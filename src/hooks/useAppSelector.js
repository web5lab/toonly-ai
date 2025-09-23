import { useSelector, useDispatch } from 'react-redux';

// Typed hooks for better TypeScript support
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();