import ReactDOM from 'react-dom/client';
import App from './layout';

import './styles/reset.scss';
import './styles/colors.scss';
import './styles/fonts.scss';
import './styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
