<script lang="ts">
  import type { ImageMetadata } from "astro";
  import githubMark from "../images/icons/github-mark-white.svg";
  import www from "../images/icons/www.svg";
  export let title: string;
  export let text: string;
  export let wideImage: { img: ImageMetadata; alt: string };
  export let addressOne: string;
  export let addressTwo: string;
</script>

<div class="card">
  <div class="img-container">
    <img src={wideImage.img.src} alt={wideImage.alt} class="img" />
  </div>
  <h5>{title}</h5>
  <p>{text}</p>
  <div class="link-container">
    <a href={addressOne} target="_blank" rel="noopener noreferrer">
      <div class="logo-wrapper">
        <img src={www.src} alt="link to web app" />
      </div>
    </a>
    <a href={addressTwo} target="_blank" rel="noopener noreferrer">
      <div class="logo-wrapper">
        <img src={githubMark.src} alt="link to github repo" />
      </div>
    </a>
  </div>
</div>

<style lang="scss">
  .card {
    background: var(--dark10);
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
    width: clamp(300px, 100%, 850px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .skinny-img {
      display: none;
    }
    .img {
      width: 100%;
      border-top-right-radius: 16px;
      border-top-left-radius: 16px;
    }

    h5 {
      padding: 8px 0 16px 8px;
    }
    p {
      color: var(--dark100);
      margin: 0;
      padding: 0px 0px 16px 8px;
    }
    .link-container {
      padding: 16px 8px 16px 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      a {
        width: 100%;
        height: 1fr;
        padding-top: 16px;
        padding-bottom: 16px;
        overflow: clip;
        border: 2px solid var(--dark100);
        border-radius: 16px;
        background: linear-gradient(
          45deg,
          var(--dark20),
          var(--dark80),
          var(--dark100),
          var(--dark80),
          var(--dark20)
        );
        box-shadow:
          rgba(0, 0, 0, 0.16) 0px 3px 6px,
          rgba(0, 0, 0, 0.23) 0px 3px 6px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .logo-wrapper {
        width: 2.2rem;
        img {
          width: 100%;
        }
      }
    }
  }
  @keyframes gradient {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 100%;
    }
  }
  @keyframes blink {
    from {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    .link-container a {
      &:hover {
        background: linear-gradient(
          45deg,
          #f17c58,
          #e94584,
          #24aadb,
          #27dbb1,
          #ffdc18,
          #ff3706
        );
        background-size: 600% 100%;

        animation: gradient 1s linear infinite;
        animation-direction: alternate;
        div {
          animation: none !important;
        }
      }
      div {
        animation: blink 1.8s ease-in-out infinite;
      }
    }
  }
  @media screen and (min-width: 800px) {
    .card {
      .link-container {
        flex-direction: row;
      }
    }
  }
</style>
