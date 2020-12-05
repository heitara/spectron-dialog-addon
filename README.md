# Spectron Dialog AddOn
Provide functionality to mock the dialog windows within Spectron tests. This is really helpful on Mac

## Installation

```bash
npm install --save-dev spectron-dialog-addon
```

## Usage

```TypeScript
import * as electron from 'electron'
import * as path from 'path'
import dialogAddon from 'spectron-dialog-addon'

const app = dialogAddon.createApplication({ args: [path.join(__dirname, '..')], path: electron.toString() })

// dialogAddon.clickMenu('Config'); // 'Config' Menu click
// dialogAddon.clickMenu('File', 'Save'); // File->Save MenuItem click
// await dialogAddon.isItemEnabled('File', 'Reset')) // Verify if MenuItem File->Reset is enabled
```

## Example

TODO: update example
https://github.com/heitara/spectron-dialog-addon/tree/master/example


## API



## License

MIT
