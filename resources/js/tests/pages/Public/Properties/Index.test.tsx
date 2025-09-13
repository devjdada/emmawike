import { render } from '@testing-library/react';
import PropertiesIndex from '@/pages/Public/Properties/Index';

describe('PropertiesIndex', () => {
    it('renders without crashing', () => {
        render(<PropertiesIndex properties={[]} />);
    });
});
