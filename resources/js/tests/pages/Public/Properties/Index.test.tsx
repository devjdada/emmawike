import PropertiesIndex from '@/pages/Public/Properties/Index';
import { render } from '@testing-library/react';

describe('PropertiesIndex', () => {
    it('renders without crashing', () => {
        render(<PropertiesIndex properties={[]} />);
    });
});
