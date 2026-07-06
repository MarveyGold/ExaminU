<script>
  import Send from "$lib/Icons/send.svelte";
  let name = $state();
  let mail = $state();
  let message = $state("Send");

  async function submit(e) {
    e.preventDefault();
    message = "Sending...";
    const res = await fetch("http://192.168.205.116:8080/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mail }),
    });
    const data = await res.json();
    if (res.ok) {
      message = "Sent";
      return { message };
    } else {
      message = "Error";
      return { message };
    }
  }
</script>

<section class="contact-us">
  <h2>Send Us Your Feedback</h2>
  <form class="form" onsubmit={submit}>
    <div class="form-group">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        bind:value={name}
        name="name"
        placeholder="Enter your name"
        required
      />
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea
        id="message"
        bind:value={mail}
        name="message"
        placeholder="Write your message"
        required
      ></textarea>
    </div>

    <button type="submit" class="btn">
      {message}
      <Send />
    </button>
  </form>
</section>

<style>
  .contact-us {
    background: linear-gradient(135deg, rgb(240, 239, 239), #f5f5f5);
    width: 100%;
    max-width: 1000px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    margin: 60px auto;
    position: static !important;
    top: auto !important;
    height: auto !important;
  }

  h2 {
    font-size: 28px;
    color: #333;
    margin: 0;
    font-weight: 800;
    text-align: center;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 600px;
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  label {
    font-weight: 600;
    color: #333;
    font-size: 14px;
  }

  input,
  textarea {
    width: 100%;
    border-radius: 12px;
    padding: 12px 15px;
    background-color: #f9f9f9;
    color: #333;
    border: 2px solid #eee;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    transition: all 0.3s ease;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #7a5cfa;
    background-color: #fff;
    box-shadow: 0 0 0 3px rgba(122, 92, 250, 0.1);
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .btn {
    background-color: #7a5cfa;
    color: white;
    padding: 14px 30px;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .btn:hover {
    background-color: #5a3eda;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(122, 92, 250, 0.3);
  }

  @media (max-width: 768px) {
    .contact-us {
      padding: 40px 25px;
      margin: 40px 15px;
      border-radius: 16px;
    }

    h2 {
      font-size: 22px;
    }

    .form {
      padding: 25px;
    }

    input,
    textarea {
      padding: 10px 12px;
      font-size: 14px;
    }

    .btn {
      padding: 12px 24px;
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .contact-us {
      padding: 25px 15px;
      margin: 20px 10px;
    }

    h2 {
      font-size: 20px;
    }

    .form {
      padding: 20px;
    }

    input,
    textarea {
      padding: 10px 12px;
      font-size: 13px;
    }

    .btn {
      padding: 10px 20px;
      font-size: 13px;
    }
  }
</style>
