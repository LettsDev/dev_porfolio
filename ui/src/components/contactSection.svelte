<script lang="ts">
  import loadingIcon from "../images/icons/loading.svg";
  import checkIcon from "../images/icons/check.svg";
  import xIcon from "../images/icons/x.svg";
  let submitState = "init";

  async function handleSubmit(ev: SubmitEvent) {
    //add loading animation
    submitState = "loading";
    const formElement = ev.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        data[key] = value;
      }
    });
    const stringData = JSON.stringify(data);
    try {
      const response = await window.fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: stringData,
      });
      const responseStatusCode = response.status;
      if (responseStatusCode.toString()[0] !== "2") {
        console.error(response.statusText);
        //handle error feedback to user
        submitState = "fail";
        return;
      }
      submitState = "success";
    } catch (err) {
      console.error("fetch error: ", err);
    }
  }
</script>

<section id="contact" data-section>
  <h4>Contact</h4>

  <h6>Let's Work Together</h6>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="small-input-container">
      <div class="input">
        <label for="name">Name</label>
        <input type="text" name="name" id="name-input" required />
      </div>
      <div class="input">
        <label for="email">Email</label>
        <input type="email" name="email" id="email-input" required />
      </div>
    </div>
    <div class="input">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        required
      />
    </div>
    <div class="btn-container">
      <button
        type="submit"
        class={`submit-btn ${submitState}`}
        disabled={submitState === "loading" ||
          submitState === "success" ||
          submitState === "fail"}
      >
        {#if submitState === "init"}
          <span> Submit </span>
        {/if}
        {#if submitState === "loading"}
          <span>
            <img
              src={loadingIcon.src}
              alt="loading icon"
              class="loading icon"
            />
          </span>
        {/if}
        {#if submitState === "success"}
          <span>
            <img src={checkIcon.src} alt="success icon" class="complete icon" />
          </span>
        {/if}
        {#if submitState === "fail"}
          <span>
            <img src={xIcon.src} alt="fail icon" class="fail icon" />
          </span>
        {/if}
      </button>
      {#if submitState === "fail"}
        <span
          >{`We've encountered a problem. Please refresh your browser and try again.`}</span
        >
      {/if}
    </div>
  </form>
</section>

<style lang="scss">
  section {
    padding: 16px 8px 24px 8px;
    margin-top: -1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--dark20);
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: clamp(325px, 80vw, 600px);
    background-color: white;
    border-radius: 16px;
    padding: 16px 16px 24px 16px;
    box-shadow:
      rgba(17, 17, 26, 0.05) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 0px 8px;
  }
  h4 {
    color: var(--accent);
    text-align: center;
    padding-bottom: 24px;
  }
  h6 {
    padding-bottom: 16px;
  }
  .input {
    display: flex;
    flex-direction: column;
    input,
    textarea {
      border-radius: 8px;
      border: 2px solid var(--dark80);
    }
    input {
      height: 24px;
    }
    label {
      font-weight: bold;
    }
  }
  .btn-container {
    padding-top: 24px;
  }
  .submit-btn {
    width: 100%;
    padding: 16px 8px;
    background: linear-gradient(
      45deg,
      var(--dark20),
      var(--dark80),
      var(--dark100),
      var(--dark80),
      var(--dark20)
    );
    border: 2px solid var(--dark100);

    border-radius: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
    span {
      font-weight: bold;
      font-size: 1rem;
    }
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
    &[disabled] {
      cursor: default;
      &:hover {
        span {
          transform: none;
        }
      }
      &:active {
        box-shadow:
          rgba(0, 0, 0, 0.16) 0px 3px 6px,
          rgba(0, 0, 0, 0.23) 0px 3px 6px;
      }
    }
    &.success {
      background-color: var(--success);
    }
    &.fail {
      background-color: var(--failure);
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    .submit-btn.init span {
      animation: blink 1.8s ease-in-out infinite;
    }
    .loading span {
      animation: rotate linear infinite 3s;
    }
    .success span,
    .fail span {
      animation: hop linear infinite 1.2s;
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
  @keyframes rotate {
    from {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.5);
    }
    to {
      transform: rotate(360deg) scale(1);
    }
  }
  @keyframes hop {
    from {
      transform: translateY(5px) scale(1);
    }
    50% {
      transform: translateY(-5px) scale(1.5);
    }
    to {
      transform: translateY(5px) scale(1);
    }
  }
  .icon {
    height: 1.2rem;
    width: 1.2rem;
  }
  @media screen and (min-width: 800px) {
    .small-input-container {
      display: flex;
      justify-content: space-around;
      gap: 8px;
      .input {
        flex-grow: 1;
      }
    }
  }
</style>
