import { IfxButton, IfxCard, IfxHeading, IfxTextInput } from "@infineon/infineon-design-system-react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <IfxCard>
        <div slot="content">
          <IfxHeading level="h1">Welcome to Infineon Design System</IfxHeading>
          <p>
            This is a React app built with the Infineon Design System components.
          </p>
          
          <div className="form-group">
            <IfxTextInput
              value={inputValue}
              onIfxChange={(e: CustomEvent) => setInputValue(e.detail)}
              placeholder="Enter your name"
              label="Name"
            />
          </div>

          <div className="button-group">
            <IfxButton 
              variant="primary"
              onClick={() => alert(`Hello, ${inputValue || "World"}!`)}
            >
              Say Hello
            </IfxButton>
            <IfxButton 
              variant="secondary"
              onClick={() => setInputValue("")}
            >
              Clear
            </IfxButton>
          </div>
        </div>
      </IfxCard>
    </div>
  );
}
