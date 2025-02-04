# JavaScript Code Flowchart Macro

A Forge UI macro that generates interactive flowchart visualizations from JavaScript code.

## Features

- Converts JavaScript code into SVG flowcharts
- Interactive slideshow with 5 different visualization types:
  - Exports
  - Imports and Exports
  - Classes and functions
  - Dependencies between functions
  - Complete flowchart details
- Toggle between code view and flowchart view
- Navigation controls for browsing different chart types

## Installation

1. Add this macro to your Forge app
2. Install dependencies:
```json
{
  "dependencies": {
    "@forge/ui": "latest",
    "js2flowchart": "latest"
  }
}
```

## Usage

1. Insert the macro into your Forge content
2. Configure by pasting JavaScript code in the macro configuration
3. The macro will render an interactive flowchart viewer

## Configuration

In the macro settings, provide:
- JavaScript code to analyze (required)

## Components

- `App`: Main component rendering the flowchart viewer
- `Config`: Configuration component for code input
- State management for:
  - Slide navigation
  - Code/flowchart view toggling
  - Chart type selection

## Props and State

- `config.code`: Input JavaScript code
- `slideNum`: Current slide index (0-4)
- `showCode`: Toggle between code and flowchart views
- `btnTitle`: Dynamic button text

## Dependencies

- @forge/ui
- js2flowchart

## License

Contact Forge app administrator for licensing details.
