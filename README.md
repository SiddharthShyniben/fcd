[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/SiddharthShyniben/fcd">
    <img src="assets/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">fcd</h3>

  <p align="center">
    Better <code>cd</code>ing for macOS
    <br />
    <a href="https://github.com/SiddharthShyniben/fcd"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/SiddharthShyniben/fcd/issues">Report Bug</a>
    ·
    <a href="https://github.com/SiddharthShyniben/fcd/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

> Please star this repo if you found this tool useful :star2:

![fcd Screen Shot][product-gif]

`fcd` is a utility which helps you `cd` faster on macOS. 

Ever had to type out a long `cd ~/Sites/Projects/project`, find out the path is wrong, rewrite it to `cd ~/Sites/Sandbox/project`? You just wasted a minute or two. 
This inspired me to create this tool: `fcd`.

`fcd` automatically reads the <abbr title="the directory name of a path, similar to the Unix dirname command">dirname</abbr> and the <abbr title="the last portion of a path, similar to the Unix basename">basename</abbr> and searches for any folder with basename as the name in the dirname folder. Once it finishes:
* If there is more than one folder named basename, it gives you a list of options to choose from, then it copies the `cd <path-to-folder>` command to your clipboard.
* If there is only one folder named basename, it directly copies the `cd <path-to-folder>` command to your clipboard.

For example:
* If you type in `cd ./folder`
  * The `basename` is `"folder"` and the `dirname` is `"."` (The current directory)

I originally meant to automatically execute the `cd <path-to-folder>` command, but then I realized that **it is impossible**, so the `cd <path-to-folder>` command is copied to clipboard instead.



### Built With

* [Node.js][node-url]


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

You need to have [Node.js][node-url] (and npm) installed.

### Installation

1. Install using npm
  ```sh
    npm i -g fcd
  ```
2. Be more productive :smile:
  ```sh
    fcd ./project
  ```

<!-- USAGE EXAMPLES -->
## Usage

```sh
fcd <folder> [options]

Change into the folder

Positionals:
  folder  The folder to cd into                       [string]

Options:
      --version  Show version number                 [boolean]
  -v, --verbose  Run in verbose mode                 [boolean]
      --help     Show help                           [boolean]

Examples:
  fcd ./somewhere  Your clipboard will now be filled with the
                   path to somewhere
```

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->



<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/SiddharthShyniben/fcd/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Discuss the contribution
2. Fork the Project
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

More info + A todo list is available in the [CONTRIBUTING file](./CONTRIBUTING.md)



<!-- LICENSE -->
## License

Distributed under the GNU GPL-3.0 License. See [`LICENSE`](./LICENSE) for more information.



<!-- CONTACT -->
## Contact

Siddharth Shyniben - siddharth.muscat@gmail.com

Project Link: [https://github.com/SiddharthShyniben/fcd](https://github.com/SiddharthShyniben/fcd)



<!-- ACKNOWLEDGEMENTS -->
<!--
## Acknowledgements

* []()
* []()
* []() -->





<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/SiddharthShyniben/fcd.svg?style=for-the-badge
[contributors-url]: https://github.com/SiddharthShyniben/fcd/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/SiddharthShyniben/fcd.svg?style=for-the-badge
[forks-url]: https://github.com/SiddharthShyniben/fcd/network/members
[stars-shield]: https://img.shields.io/github/stars/SiddharthShyniben/fcd.svg?style=for-the-badge
[stars-url]: https://github.com/SiddharthShyniben/fcd/stargazers
[issues-shield]: https://img.shields.io/github/issues/SiddharthShyniben/fcd.svg?style=for-the-badge
[issues-url]: https://github.com/SiddharthShyniben/fcd/issues
[license-shield]: https://img.shields.io/github/license/SiddharthShyniben/fcd.svg?style=for-the-badge
[license-url]: https://github.com/SiddharthShyniben/fcd/blob/master/LICENSE
[product-gif]: ./assets/demo/fcdemo.gif
[node-url]: https://nodejs.org