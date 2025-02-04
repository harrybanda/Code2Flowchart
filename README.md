Flowchart Generation Macro Documentation

This document describes the functionality and usage of a ForgeUI-based macro that converts JavaScript code into an interactive flowchart. The macro leverages the js2flowchart library to generate flowchart slides from user-provided JavaScript code and offers a user interface to toggle between the raw code and its visual flowchart representation.

Table of Contents
	1.	Overview
	2.	Key Dependencies
	3.	Code Structure
	4.	Detailed Walkthrough
	•	Imports and Default Configuration
	•	The App Component
	•	Macro Rendering
	•	The Config Component
	5.	Usage Instructions
	6.	Summary

Overview

This macro provides an interactive interface to visualize JavaScript code as a flowchart. The key features include:
	•	Flowchart Generation: Converts JavaScript code into a series of flowchart slides using js2flowchart.
	•	Toggle Views: Users can switch between a source code view and a flowchart view.
	•	Slide Navigation: When viewing the flowchart, users can navigate between different slides that highlight various aspects of the code (e.g., exports, dependencies).

Key Dependencies
	•	@forge/ui: A UI library for building Atlassian Forge applications.
	•	js2flowchart: A library to convert JavaScript code into flowchart diagrams.

Code Structure

The code is divided into two main parts:
	1.	Macro UI Component (App): Renders the main interface where the generated flowchart and code are displayed.
	2.	Configuration Component (Config): Provides the configuration interface for users to enter their JavaScript code.

Additionally, the macro is rendered using the render function from @forge/ui for both the main UI and the configuration panel.

Detailed Walkthrough

Imports and Default Configuration

import ForgeUI, {
  render,
  Fragment,
  Macro,
  Image,
  Button,
  TextArea,
  Code,
  useConfig,
  useState,
  MacroConfig,
  ButtonSet,
  Text,
  Strong,
} from "@forge/ui";
import * as js2flowchart from "js2flowchart";

const { createPresentationGenerator } = js2flowchart;

const defaultConfig = {
  code: "",
};

	•	ForgeUI Components: Various UI components (e.g., Button, Image, Code) are imported to build the macro interface.
	•	js2flowchart: The library is imported to generate flowchart slides from JavaScript code. The createPresentationGenerator function is used for this purpose.
	•	defaultConfig: Provides a fallback configuration with an empty code property if the user does not supply any code.

The App Component

The App component is the main interface for the macro.

const App = () => {
  const config = useConfig() || defaultConfig;
  const presentationGenerator = createPresentationGenerator(config.code);
  const slides = presentationGenerator.buildSlides();

  const [showCode, setShowCode] = useState(false);
  const [btnTitle, setBtnTitle] = useState("View code");
  const [slideNum, setSlideNum] = useState(4);

  const slideNames = [
    "Exports",
    "Imports and Exports",
    "Classes and functions",
    "Dependencies between functions",
    "All flowchart details details",
  ];

  const svg = slides[slideNum];

  return (
    <Fragment>
      {showCode ? (
        <Code text={config.code} language="javascript" />
      ) : (
        <Fragment>
          <Image
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
            alt="diagram"
          />
          <Text>
            <Strong>{slideNames[slideNum]}</Strong>
          </Text>
          <ButtonSet>
            <Button
              text="Prev"
              onClick={() => {
                setSlideNum(slideNum - 1);
                if (slideNum <= 0) setSlideNum(4);
              }}
            />
            <Button
              text="Next"
              onClick={() => {
                setSlideNum(slideNum + 1);
                if (slideNum >= 4) setSlideNum(0);
              }}
            />
          </ButtonSet>
        </Fragment>
      )}
      <Button
        text={btnTitle}
        onClick={function () {
          setShowCode(!showCode);
          if (showCode) {
            setBtnTitle("View code");
          } else {
            setBtnTitle("View flowchart");
          }
        }}
      />
    </Fragment>
  );
};

Key Elements:
	•	Configuration Retrieval:
The component retrieves the configuration (i.e., the JavaScript code) using the useConfig hook. If no configuration is provided, it defaults to defaultConfig.
	•	Flowchart Generation:
The JavaScript code from the configuration is passed to createPresentationGenerator, which then generates flowchart slides by calling buildSlides(). These slides are stored in an array.
	•	State Management:
	•	showCode: A boolean state that toggles between displaying the source code and the flowchart.
	•	btnTitle: The text displayed on the toggle button. It updates based on the current view.
	•	slideNum: Indicates which slide is currently being viewed.
	•	Slide Navigation:
	•	An array slideNames contains labels for each slide.
	•	The current slide’s SVG is extracted using slides[slideNum].
	•	Two buttons (“Prev” and “Next”) are provided to navigate through the slides. The slide number wraps around (i.e., going below the first slide resets to the last slide, and vice versa).
	•	View Toggling:
	•	When showCode is true, the Code component is used to display the raw JavaScript code.
	•	Otherwise, the flowchart slide is displayed using the Image component, along with its corresponding label.
	•	A toggle button allows switching between the two views.

Macro Rendering

The macro UI is rendered by exporting a run function:

export const run = render(<Macro app={<App />} />);

	•	Macro Component:
The App component is wrapped in the Macro component, which is then rendered using ForgeUI’s render function.

The Config Component

The configuration component defines the UI for entering JavaScript code.

const Config = () => {
  return (
    <MacroConfig>
      <TextArea label="Enter Javascript code" name="code" />
    </MacroConfig>
  );
};

export const config = render(<Config />);

Key Elements:
	•	MacroConfig Container:
Provides the layout for the macro’s configuration settings.
	•	TextArea Input:
A text area labeled “Enter Javascript code” is provided for users to input the JavaScript code that will be used to generate the flowchart.
	•	Rendering the Configuration UI:
The configuration component is rendered by exporting config using the render function.

Usage Instructions
	1.	Enter Code in the Configuration Panel:
	•	When setting up the macro, enter your JavaScript code into the provided text area in the configuration interface.
	2.	View the Generated Flowchart:
	•	After saving the configuration, the macro processes the code and generates a set of flowchart slides.
	•	By default, the macro will display one of these slides as an SVG image.
	3.	Toggle Between Views:
	•	Use the toggle button to switch between viewing the source code (with syntax highlighting) and the generated flowchart.
	4.	Navigate Through Flowchart Slides:
	•	In flowchart view, use the “Prev” and “Next” buttons to navigate through different slides.
	•	Each slide is labeled (e.g., “Exports”, “Imports and Exports”) to indicate the aspect of the code being visualized.

Summary

This ForgeUI macro effectively transforms JavaScript code into an interactive flowchart, enhancing code analysis and understanding. The user interface supports toggling between the code view and flowchart view, as well as slide navigation to explore different structural elements of the code. The integration with the js2flowchart library makes it a powerful tool for visualizing code logic and dependencies.

Feel free to integrate this macro into your Atlassian Forge application and customize it further to suit your specific needs.
