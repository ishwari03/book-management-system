import React from 'react';
import './LoadingSkeleton.css';

function SkeletonCard() {
  return (
    <div className="skeleton-card skeleton-pulse">
      <div className="skeleton-cover" />
      <div className="skeleton-card-body">
        <div className="skeleton-line skeleton-w-75 skeleton-h-md" />
        <div className="skeleton-line skeleton-w-50 skeleton-h-sm" />
        
        <div className="skeleton-stack">
          <div className="skeleton-line skeleton-w-full skeleton-h-xs" />
          <div className="skeleton-line skeleton-w-80 skeleton-h-xs" />
        </div>
        
        <div className="skeleton-card-footer">
          <div className="skeleton-line skeleton-w-20 skeleton-h-sm" />
          <div className="skeleton-line skeleton-w-16 skeleton-h-sm" />
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="skeleton-row skeleton-pulse">
      <div className="skeleton-spine" />
      
      <div className="skeleton-row-info">
        <div className="skeleton-line skeleton-w-33 skeleton-h-md" />
        <div className="skeleton-line skeleton-w-25 skeleton-h-sm" />
        <div className="skeleton-line skeleton-w-50 skeleton-h-sm" />
      </div>
      
      <div className="skeleton-row-actions">
        <div className="skeleton-btn-placeholder" />
        <div className="skeleton-btn-placeholder" />
      </div>
    </div>
  );
}

export default function LoadingSkeleton({ viewMode }) {
  const count = viewMode === 'grid' ? 8 : 6;
  const containerClass = viewMode === 'grid' ? 'skeleton-grid-view' : 'skeleton-list-view';

  return (
    <div className={containerClass}>
      {Array.from({ length: count }).map((_, i) =>
        viewMode === 'grid' ? <SkeletonCard key={i} /> : <SkeletonRow key={i} />
      )}
    </div>
  );
}