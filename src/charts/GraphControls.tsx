import React from 'react';
import { cn } from '../utils/cn';

export interface GraphControlsProps {
  /**
   * Whether dragging is enabled
   */
  dragEnabled?: boolean;

  /**
   * Callback to toggle drag mode
   */
  onDragToggle?: (enabled: boolean) => void;

  /**
   * Whether manual layout mode is enabled
   */
  manualLayout?: boolean;

  /**
   * Callback to toggle manual layout mode
   */
  onManualLayoutToggle?: (enabled: boolean) => void;

  /**
   * Callback to pin all nodes
   */
  onPinAll?: () => void;

  /**
   * Callback to unpin all nodes
   */
  onUnpinAll?: () => void;

  /**
   * Callback to center/reset the view
   */
  onReset?: () => void;

  /**
   * Callback to fit all nodes in view
   */
  onFitView?: () => void;

  /**
   * Number of pinned nodes
   */
  pinnedCount?: number;

  /**
   * Total number of nodes
   */
  totalNodes?: number;

  /**
   * Whether to show the controls
   * @default true
   */
  visible?: boolean;

  /**
   * Position of the controls
   * @default "top-left"
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * GraphControls: Floating toolbar for manipulating graph layout and dragging
 * Provides controls for toggling drag mode, manual layout, pinning nodes, and resetting the view
 */
export const GraphControls: React.FC<GraphControlsProps> = ({
  dragEnabled = true,
  onDragToggle,
  manualLayout = false,
  onManualLayoutToggle,
  onPinAll,
  onUnpinAll,
  onReset,
  onFitView,
  pinnedCount = 0,
  totalNodes = 0,
  visible = true,
  position = 'top-left',
  className,
}) => {

  if (!visible) return null;

  const positionClasses: Record<string, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const ControlButton: React.FC<{
    onClick: () => void;
    active?: boolean;
    icon: string;
    label: string;
    disabled?: boolean;
  }> = ({ onClick, active = false, icon, label, disabled = false }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'p-2 rounded-lg transition-all duration-200',
          active
            ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          disabled && 'opacity-50 cursor-not-allowed hover:bg-gray-100',
          'dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:active:bg-blue-600'
        )}
        title={label}
      >
        <span className="text-lg">{icon}</span>
      </button>
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
        {label}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        'fixed z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700',
        positionClasses[position],
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {/* Drag Mode Toggle */}
        <ControlButton
          onClick={() => onDragToggle?.(!dragEnabled)}
          active={dragEnabled}
          icon="✋"
          label={dragEnabled ? 'Drag enabled' : 'Drag disabled'}
        />

        {/* Manual Layout Toggle */}
        <ControlButton
          onClick={() => onManualLayoutToggle?.(!manualLayout)}
          active={manualLayout}
          icon="🔧"
          label={manualLayout ? 'Manual layout: ON (drag freely)' : 'Manual layout: OFF (forces active)'}
        />

        {/* Divider */}
        <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 mx-auto my-1" />

        {/* Pin/Unpin Controls */}
        <div className="flex gap-1">
          <ControlButton
            onClick={() => onPinAll?.()}
            disabled={totalNodes === 0}
            icon="📌"
            label={`Pin all nodes (${totalNodes})`}
          />
          <ControlButton
            onClick={() => onUnpinAll?.()}
            disabled={pinnedCount === 0}
            icon="📍"
            label={`Unpin all (${pinnedCount} pinned)`}
          />
        </div>

        {/* Divider */}
        <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 mx-auto my-1" />

        {/* View Controls */}
        <ControlButton
          onClick={() => onFitView?.()}
          disabled={totalNodes === 0}
          icon="🎯"
          label="Fit all nodes in view"
        />

        <ControlButton
          onClick={() => onReset?.()}
          disabled={totalNodes === 0}
          icon="↺"
          label="Reset to auto-layout"
        />
      </div>

      {/* Info Panel */}
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
        <div className="whitespace-nowrap">
          <strong>Nodes:</strong> {totalNodes}
        </div>
        {pinnedCount > 0 && (
          <div className="whitespace-nowrap">
            <strong>Pinned:</strong> {pinnedCount}
          </div>
        )}
        <div className="mt-2 text-gray-500 dark:text-gray-500 leading-snug">
          <strong>Tips:</strong>
          <ul className="mt-1 ml-1 space-y-0.5">
            <li>• Drag nodes to reposition</li>
            <li>• Double-click to pin/unpin</li>
            <li>• Double-click canvas to unpin all</li>
            <li>• Scroll to zoom</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

GraphControls.displayName = 'GraphControls';
