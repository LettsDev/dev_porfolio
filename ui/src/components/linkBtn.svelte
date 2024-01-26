<script lang="ts">
  export let address: string;
  export let blink = false;
  export let linkContent: HTMLElement;
</script>

<a href={address} target="_blank" rel="noopener noreferrer">
  <span class={blink ? "blink" : undefined}>
    {linkContent}
  </span>
</a>

<style lang="scss">
  a {
    text-decoration: none;
    padding: 16px 8px;
    background: var(--accent);
    border: none;
    border-radius: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    &:hover {
      span {
        transform: scale(1.1);
        transition: transform 0.2s ease-in;
      }
    }
    &:active {
      box-shadow:
        rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
        rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    span.blink {
      animation: blink 1.3s ease-in-out infinite;
    }
  }
  @keyframes blink {
    from {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
    to {
      opacity: 0.5;
    }
  }
</style>
