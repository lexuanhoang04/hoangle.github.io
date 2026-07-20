// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/hoangle.github.io/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/hoangle.github.io/blog/";
          },
        },{id: "nav-works",
          title: "works",
          description: "papers, posters, and ongoing research.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/hoangle.github.io/works/";
          },
        },{id: "nav-fun",
          title: "fun",
          description: "Life outside research.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/hoangle.github.io/fun/";
          },
        },{id: "post-camera-intrinsic-models",
        
          title: "Camera Intrinsic Models",
        
        description: "a blog about camera models in computer vision, from pinhole projection to lens distortion",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/hoangle.github.io/blog/2026/camera_models/";
          
        },
      },{id: "post-transformer-positional-encoding",
        
          title: "Transformer - Positional Encoding",
        
        description: "a blog about Positional Encoding in Transformer architecture",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/hoangle.github.io/blog/2026/transformer_PE/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/hoangle.github.io/books/the_godfather/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/hoangle.github.io/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/hoangle.github.io/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6C%65%68%6F%61%6E%67%32@%6D%73%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/lexuanhoang04", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/hoang-le-aa14a81a6", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
