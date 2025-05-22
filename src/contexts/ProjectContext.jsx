import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { db } from '../components/firebase'; 
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

const ProjectContext = createContext(null);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [projectItems, setProjectItems] = useState([]);
  const [otherCosts, setOtherCosts] = useState([]);

  // Firestore collection references
  const getItemsCollection = () => collection(db, 'users', currentUser.uid, 'items');
  const getOtherCostsCollection = () => collection(db, 'users', currentUser.uid, 'otherCosts');

  // Realtime listeners
  useEffect(() => {
    if (!currentUser) return;

    const itemsUnsub = onSnapshot(query(getItemsCollection()), (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjectItems(items);
    });

    const costsUnsub = onSnapshot(query(getOtherCostsCollection()), (snapshot) => {
      const costs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOtherCosts(costs);
    });

    return () => {
      itemsUnsub();
      costsUnsub();
    };
  }, [currentUser]);

  // CRUD operations
  const addProjectItem = async (item) => {
    await addDoc(getItemsCollection(), item);
  };

  const updateProjectItem = async (id, updatedItem) => {
    const ref = doc(db, 'users', currentUser.uid, 'items', id);
    await updateDoc(ref, updatedItem);
  };

  const deleteProjectItem = async (id) => {
    const ref = doc(db, 'users', currentUser.uid, 'items', id);
    await deleteDoc(ref);
  };

  const addOtherCost = async (cost) => {
    await addDoc(getOtherCostsCollection(), cost);
  };

  const updateOtherCost = async (id, updatedCost) => {
    const ref = doc(db, 'users', currentUser.uid, 'otherCosts', id);
    await updateDoc(ref, updatedCost);
  };

  const deleteOtherCost = async (id) => {
    const ref = doc(db, 'users', currentUser.uid, 'otherCosts', id);
    await deleteDoc(ref);
  };

  const getTotalProjectCost = useCallback(() => {
    const projectTotal = projectItems.reduce((sum, item) => sum + Number(item.cost || 0), 0);
    const otherTotal = otherCosts.reduce((sum, cost) => sum + Number(cost.amount || 0), 0);
    return projectTotal + otherTotal;
  }, [projectItems, otherCosts]);

  const value = {
    projectItems,
    otherCosts,
    addProjectItem,
    updateProjectItem,
    deleteProjectItem,
    addOtherCost,
    updateOtherCost,
    deleteOtherCost,
    getTotalProjectCost
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
