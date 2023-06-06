import { Skeleton } from "@mantine/core";

const AdminSkeleton = () => {
  return (
    <div className="skeleton-container">
      <Skeleton height={50} className="skeleton-item" />
      <Skeleton height={50} className="skeleton-item" />
      <Skeleton height={50} className="skeleton-item" />
      <Skeleton height={50} className="skeleton-item" />
      <Skeleton height={50} className="skeleton-item" />
      <Skeleton height={50} className="skeleton-item" />
      <Skeleton height={50} className="skeleton-item" />
    </div>
  );
};

export default AdminSkeleton;
