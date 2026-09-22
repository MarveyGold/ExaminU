<script>
  import Send from "$lib/Icons/send.svelte";
  import { submitFeedback } from './feedback.remote.js';

  let status = $state('idle');
  let formElement = $state();
</script>

<section class="contact-us" id="contact">
  <h2>Send Us Your Feedback</h2>
  <form
    bind:this={formElement}
    class="form"
    {...submitFeedback.enhance(async ({ submit }) => {
      status = 'sending';
      try {
        await submit();
        status = 'sent';
        if (formElement) formElement.reset();
      } catch {
        status = 'error';
      }
    })}
  >
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        {...submitFeedback.fields.name.as('text')}
        placeholder="Enter your name"
        required
      />
    </div>
    <div class="form-group">
      <label for="message">Message</label>
      <textarea
        id="message"
        {...submitFeedback.fields.message.as('text')}
        placeholder="Write your feedback or questions..."
        required
      ></textarea>
    </div>

    <button type="submit" class="btn" disabled={status === 'sending'}>
      {#if status === 'sending'}
        Sending...
      {:else if status === 'sent'}
        Sent Successfully!
      {:else if status === 'error'}
        Try Again
      {:else}
        Send Feedback
      {/if}
      <Send />
    </button>
  </form>
</section>

<style>
  .contact-us {
    background: #ffffff;
    width: 100%;
    max-width: 800px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border-radius: 24px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin: 40px auto;
  }

  h2 {
    font-size: 24px;
    color: #1a1030;
    margin: 0;
    font-weight: 800;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-weight: 600;
    color: #4b5563;
    font-size: 14px;
  }

  input,
  textarea {
    width: 100%;
    border-radius: 10px;
    padding: 12px 14px;
    background-color: #f9fafb;
    color: #111827;
    border: 1px solid #e5e7eb;
    font-size: 15px;
    transition: all 0.2s ease;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #7a5cfa;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(122, 92, 250, 0.15);
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .btn {
    background-color: #7a5cfa;
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    align-self: flex-end;
  }

  .btn:hover:not(:disabled) {
    background-color: #5a3eda;
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
</style>
