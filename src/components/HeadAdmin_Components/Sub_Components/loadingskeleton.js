import { Skeleton } from '@mantine/core';

const LoadingSkeleton = () => {
  return (
    <div className="skeleton-container">
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
      <Skeleton height={40} className="skeleton-item" />
  
    </div>
  );
};

export default LoadingSkeleton;
