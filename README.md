<div align="center" width="100%">
    <h1> 📒 Chromium Project Manager </h1>
    <div align="center" width="100%">
        <a href="https://microsoftedge.microsoft.com/addons/detail/chromium-project-and-tick/lmommmfjoeelaikbmmlcebpjcnoaljdj" target="_blank" alt="Edge Extension">
            <img src="https://img.shields.io/badge/Edge%20Extension-0078D7?style=flat&logo=microsoftedge&logoColor=0078D7&labelColor=EEEEEE" />
        </a>
        <a href="https://chromewebstore.google.com/detail/chromium-project-and-tick/lmnmajkmfjlnjjeeiaodkekfblbdkfoi?hl=pt-PT&authuser=0&pli=1" target="_blank" alt="Chrome Extension">
            <img src="https://img.shields.io/badge/Chrome%20Extension-4285F4?style=flat&logo=googlechrome&logoColor=4285F4&labelColor=EEEEEE" />
        </a>
    </div>
</div>

## 📄 Table of Contents
1. [💡 Motivation for the Project](#💡-motivation-for-the-project)
    - [Why This Extension?](#🚀-why-this-extension)
    - [Project Goals](#🌐-project-goals)
    - [Join the Journey](#🌈-join-the-journey)
2. [⚙️ How to Run](#⚙️-how-to-run)
    - [Prerequisites](#⚠️-prerequisites)
    - [Installation](#📥-installation)
    - [Building the Project](#🏗️-building-the-project)
3. [🏈 How to Use](#🏈-how-to-use)
    - [Loading the Extension in Chromium Manually](#🔄-loading-the-extension-in-chromium-manually)
    - [Usage](#🌐-usage)
4. [🤝 Contributing](#🤝-contributing)

------

## 💡 Motivation for the Project

In the fast-paced world of software development, staying organized and efficiently managing work tickets is crucial for a seamless workflow. This Chromium extension was born out of my passion for maintaining a structured approach to project management.

As a developer, I understand the importance of having a centralized hub to track every aspect of a project, from individual tasks to overarching project goals.

### 🚀 Why This Extension?

#### 1. **Effortless Ticket Management:**
Streamline your workflow by easily creating and managing projects and associated tickets within the Chromium browser.

#### 2. **Quick Access to Underlying Tasks:**
Accelerate your development process by swiftly accessing tickets under active development, ensuring a seamless transition between tasks.

#### 3. **Sprint Review Presentations Made Easy:**
Simplify sprint reviews by having all pertinent ticket information readily available. Showcase progress, related branches, and pull requests effortlessly.

#### 4. **Clipboard Copy for Efficiency:**
Save time with the one-click clipboard copy feature. Copy code for branches, pull request titles, or any other essential information with ease.

### 🌐 Project Goals

This extension aims to:
- Provide a user-friendly interface for efficient project and ticket management.
- Enhance collaboration by facilitating quick access to task-related information.
- Improve the overall development process by offering utilities for code-related tasks.
- Support sprint review presentations with comprehensive ticket details.

### 🌈 Join the Journey

I invite you to join me on this journey of simplifying project management and boosting development productivity. Feel free to contribute, share your feedback, and help shape the future of this Chromium extension.

Let's make the process of managing work tickets not just a task but a seamless and enjoyable experience!

Happy coding! 🚀

## ⚙️ How to Run

To get started with this Chromium extension project, follow the steps below:

### ⚠️ Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

### 📥 Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Sousa99/chromium-project-manager.git
    ```

2. Navigate to the project directory:

    ```bash
    cd chromium-project-manager
    ```

3. Install dependencies using npm:

    ```bash
    npm install
    ```

### 🏗️ Building the Project

Before loading the extension into Chromium, you need to build the project. Use the following command:

```bash
npm run build
```

This command generates a build directory with the necessary files for your Chromium extension.

### 🚀 Running the Project
Once you have built the project, you can run the development server with hot reload. Use the following command:

```bash
npm run start
```

This command starts the development server, and you can access the extension in your Chromium browser.

## 🏈 How to Use

### 🔄 Loading the Extension in Chromium Manually
1. Open your Chromium browser.
2. Navigate to chrome://extensions/.
3. Enable "Developer mode" at the top right corner.
4. Click on "Load unpacked" and select the build directory within your project folder.

The extension should now be loaded in your Chromium browser.

### 🌐 Usage
After loading the extension, you can start managing projects and tickets directly from the Chromium browser. Access the extension toolbar to create projects, add tickets, and utilize the various features it offers.

Feel free to explore and customize the extension to suit your workflow!

## 🤝 Contributing
If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Your contributions are highly appreciated!

Happy coding! 🚀