import { TenantSwitcher } from './components/TenantSwitcher';
import { TenantInfo } from './components/TenantInfo';
import './app.css';

export function App() {
  return (
    <div className="app">
      <header>
        <h1>Multitenant Starter</h1>
        <p>Select a tenant to load tenant-specific data.</p>
      </header>
      <main>
        <TenantSwitcher />
        <TenantInfo />
      </main>
    </div>
  );
}
