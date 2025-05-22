import { createContext, useContext, useState, useCallback } from 'react';

const ProjectContext = createContext(null);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projectItems, setProjectItems] = useState([]);
  const [otherCosts, setOtherCosts] = useState([]);

  const addProjectItem = useCallback((item) => {
    setProjectItems(prev => [...prev, { ...item, id: Date.now() }]);
  }, []);

  const updateProjectItem = useCallback((id, updatedItem) => {
    setProjectItems(prev => 
      prev.map(item => item.id === id ? { ...item, ...updatedItem } : item)
    );
  }, []);

  const deleteProjectItem = useCallback((id) => {
    setProjectItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const addOtherCost = useCallback((cost) => {
    setOtherCosts(prev => [...prev, { ...cost, id: Date.now() }]);
  }, []);

  const updateOtherCost = useCallback((id, updatedCost) => {
    setOtherCosts(prev => 
      prev.map(cost => cost.id === id ? { ...cost, ...updatedCost } : cost)
    );
  }, []);

  const deleteOtherCost = useCallback((id) => {
    setOtherCosts(prev => prev.filter(cost => cost.id !== id));
  }, []);

  const getTotalProjectCost = useCallback(() => {
    const projectTotal = projectItems.reduce((sum, item) => sum + Number(item.cost), 0);
    const otherTotal = otherCosts.reduce((sum, cost) => sum + Number(cost.amount), 0);
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