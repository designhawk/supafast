// ============================================================================
// INFINEON DESIGN SYSTEM - USE ONLY THESE COMPONENTS
// ============================================================================
// NO regular HTML: <button>, <input>, <textarea>, <select>
// YES use these:
//   <ifx-button variant="primary|secondary|ghost|danger">Text</ifx-button>
//   <ifx-card><div slot="header">Title</div>Content</ifx-card>
//   <ifx-text-field placeholder="..." value={x} onIfxInput={handler} />
//   <ifx-textarea placeholder="..." value={x} rows={5} onIfxInput={handler} />
//   <ifx-checkbox checked={x} onIfxChange={handler}>Label</ifx-checkbox>
//   <ifx-select value={x} onIfxChange={handler}><option>...</option></ifx-select>
//   <ifx-list-group><ifx-list-entry>...</ifx-list-entry></ifx-list-group>
//   <ifx-modal open={show} onIfxClose={closeHandler}><div slot="header">...</div>...</ifx-modal>
//   <ifx-badge variant="primary|success|warning|danger">Text</ifx-badge>
//   <ifx-chip removable>Text</ifx-chip>
//   <ifx-alert variant="info|success|warning|error" dismissible>Message</ifx-alert>
//   <ifx-icon icon="calendar24"></ifx-icon>
// ============================================================================

import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <div className="app">
      <ifx-card>
        <div slot="header">
          <h1>Infineon Design System</h1>
        </div>
        <p className="subtitle">Pure Infineon Components - No HTML Mixing</p>
      </ifx-card>

      <ifx-card>
        <div slot="header">
          <h2>Buttons</h2>
        </div>
        <div className="component-section">
          <ifx-button variant="primary">Primary Button</ifx-button>
          <ifx-button variant="secondary">Secondary Button</ifx-button>
          <ifx-button variant="ghost">Ghost Button</ifx-button>
          <ifx-button variant="danger">Danger Button</ifx-button>
        </div>
      </ifx-card>

      <ifx-card>
        <div slot="header">
          <h2>Form Inputs</h2>
        </div>
        
        <div className="component-section">
          <h3>Text Field</h3>
          <ifx-text-field 
            placeholder="Enter your name..."
            value={inputValue}
            onIfxInput={(e: any) => setInputValue(e.target.value)}
          />
        </div>

        <div className="component-section">
          <h3>Text Area</h3>
          <ifx-textarea 
            placeholder="Enter description..."
            rows={4}
          />
        </div>

        <div className="component-section">
          <h3>Select Dropdown</h3>
          <ifx-select 
            value={selectedValue}
            onIfxChange={(e: any) => setSelectedValue(e.target.value)}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </ifx-select>
        </div>

        <div className="component-section">
          <h3>Checkbox</h3>
          <ifx-checkbox 
            checked={checked}
            onIfxChange={(e: any) => setChecked(e.target.checked)}
          >
            I agree to the terms
          </ifx-checkbox>
        </div>
      </ifx-card>

      <ifx-card>
        <div slot="header">
          <h2>Badges & Chips</h2>
        </div>
        <div className="component-section">
          <ifx-badge variant="primary">Primary Badge</ifx-badge>
          <ifx-badge variant="success">Success</ifx-badge>
          <ifx-badge variant="warning">Warning</ifx-badge>
          <ifx-badge variant="danger">Danger</ifx-badge>
        </div>
        <div className="component-section">
          <ifx-chip>Default Chip</ifx-chip>
          <ifx-chip removable>Removable Chip</ifx-chip>
        </div>
      </ifx-card>

      <ifx-card>
        <div slot="header">
          <h2>Alerts</h2>
        </div>
        <div className="component-section">
          <ifx-alert variant="info">
            This is an informational message
          </ifx-alert>
        </div>
      </ifx-card>

      <ifx-card>
        <div slot="header">
          <h2>List Group</h2>
        </div>
        <ifx-list-group>
          <ifx-list-entry>Item 1</ifx-list-entry>
          <ifx-list-entry>Item 2</ifx-list-entry>
          <ifx-list-entry>Item 3</ifx-list-entry>
        </ifx-list-group>
      </ifx-card>
    </div>
  );
}

export default App;
