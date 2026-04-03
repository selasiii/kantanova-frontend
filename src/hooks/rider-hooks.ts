import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { riderService } from '../services/riderService';

export const useRiderStats = () => {
  return useQuery({
    queryKey: ['rider', 'stats'],
    queryFn: () => riderService.getStats(),
  });
};

export const useAvailableTasks = () => {
  return useQuery({
    queryKey: ['rider', 'tasks', 'available'],
    queryFn: () => riderService.getAvailableTasks(),
  });
};

export const useActiveTasks = () => {
  return useQuery({
    queryKey: ['rider', 'tasks', 'active'],
    queryFn: () => riderService.getActiveTasks(),
  });
};

export const useRiderActions = () => {
  const queryClient = useQueryClient();

  const acceptTask = useMutation({
    mutationFn: riderService.acceptTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rider', 'tasks'] });
      queryClient.invalidateQueries({ queryKey: ['rider', 'stats'] });
    },
  });

  const pickUpTask = useMutation({
    mutationFn: riderService.pickUpTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rider', 'tasks'] }),
  });

  const completeTask = useMutation({
    mutationFn: riderService.completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rider', 'tasks'] });
      queryClient.invalidateQueries({ queryKey: ['rider', 'stats'] });
    },
  });

  const toggleStatus = useMutation({
    mutationFn: riderService.toggleStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rider', 'stats'] }),
  });

  return {
    acceptTask,
    pickUpTask,
    completeTask,
    toggleStatus
  };
};
