<script lang="ts">
  import { onMount } from "svelte";
  let navElement: HTMLElement;
  let navScrolled: boolean;
  onMount(() => {
    //nav styling on intersecting sections
    const sections = [...document.querySelectorAll("[data-section]")];
    const navLinks = [...navElement.querySelectorAll("a")];
    let prevYPos = 0;
    let scrollDirection = "up";
    const observerOptions = {
      rootMargin: `${navElement.offsetHeight * -1}px`,
      threshold: 0,
    };
    const getTargetSection = (entry: IntersectionObserverEntry) => {
      const index = sections.findIndex((section) => {
        return section == entry.target;
      });
      if (index >= sections.length - 1) {
        return entry.target;
      } else {
        return sections[index + 1];
      }
    };
    const shouldUpdate = (entry: IntersectionObserverEntry) => {
      const currentYPos = window.scrollY;
      if (
        (scrollDirection === "down" &&
          currentYPos > prevYPos &&
          !entry.isIntersecting) ||
        (scrollDirection === "up" &&
          currentYPos < prevYPos &&
          entry.isIntersecting)
      ) {
        return true;
      }
      return false;
    };

    const updateMarker = (target: Element | void) => {
      if (target) {
        const link = navLinks.find((el) => {
          return el.getAttribute("href") === `#${target.id}`;
        });
        navLinks.forEach((link) => {
          link.classList.remove("select");
        });
        link?.classList.add("select");
        return;
      }
      return;
    };
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (window.scrollY > prevYPos) {
          scrollDirection = "down";
        } else {
          scrollDirection = "up";
        }
        prevYPos = window.scrollY;
        const target =
          scrollDirection === "down" ? getTargetSection(entry) : entry.target;

        if (shouldUpdate(entry)) {
          updateMarker(target);
        }
      });
    };

    let observer = new IntersectionObserver(onIntersect, observerOptions);
    sections.forEach((section) => {
      observer.observe(section);
    });
    //Nav styling on scrolled vs top of document
    if (window.scrollY > 0) {
      navElement.classList.add("scrolled");
      navScrolled = true;
    }
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        navElement.classList.add("scrolled");
        navElement.classList.remove("fade");
        navScrolled = true;
      } else {
        navElement.classList.remove("scrolled");
        navElement.classList.add("fade");
        navScrolled = false;
      }
    });
    //setting the scroll offset based on the height of the nav
    document.documentElement.style.setProperty(
      "--scroll-padding",
      navElement.offsetHeight - 1 + "px"
    );
  });
</script>

<nav
  bind:this={navElement}
  class={`container ${navScrolled ? "scrolled" : "fade"}`}
>
  <ul>
    <li>
      <a href="#project">
        <h6>Projects</h6>
      </a>
    </li>
    <li>
      <a href="#about">
        <h6>About Me</h6>
      </a>
    </li>
    <li>
      <a href="#contact">
        <h6>Contact</h6>
      </a>
    </li>
  </ul>
</nav>

<style lang="scss">
  nav {
    padding: 16px 0px;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  ul {
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    transition: {
      property: transform;
      duration: 0.4s;
    }
    &:hover {
      transform: scale(110%);
    }
  }
  a {
    text-decoration: none;
    &:global(.select) h6 {
      color: var(--accent);
    }
  }
  .scrolled {
    box-shadow:
      rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
    background-color: var(--dark10);
    transition:
      box-shadow 1s,
      background-color 1s;
  }
  .fade {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition:
      box-shadow 1s,
      background-color 1s;
  }
</style>
