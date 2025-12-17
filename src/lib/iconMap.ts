import {
    Brain,
    Blocks,
    Cloud,
    Code,
    ShoppingCart,
    Rocket,
    Search,
    Wrench,
    LucideIcon
} from 'lucide-react';

// Icon mapping for services
export const iconMap: Record<string, LucideIcon> = {
    'AI': Brain,
    'BC': Blocks,
    'SA': Cloud,
    'WD': Code,
    'EC': ShoppingCart,
    'MV': Rocket,
    'SE': Search,
    'WM': Wrench,
    // Full names as fallback
    'Brain': Brain,
    'Blocks': Blocks,
    'Cloud': Cloud,
    'Code': Code,
    'ShoppingCart': ShoppingCart,
    'Rocket': Rocket,
    'Search': Search,
    'Wrench': Wrench,
};

export function getIconComponent(iconKey?: string): LucideIcon | undefined {
    if (!iconKey) return undefined;
    return iconMap[iconKey] || Code; // Default to Code icon
}
