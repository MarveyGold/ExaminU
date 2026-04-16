<script>
  import Send from "$lib/Icons/send.svelte";
  let name = $state();
  let mail = $state();
  let message = $state("Send");
  let active = $state("mail");
  function handleChange(e) {
    mail = e.target.value;
  }

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

<section id="contact-us" class="contact-us">
  <h4>Send Us Your Feedback</h4>
  <span class="sponsors">
    <form class="form" id="mail" onsubmit={submit}>
      <span>
        <label for="name">Name:</label>
        <input
          type="text"
          bind:value={name}
          name="name"
          placeholder="Enter your name"
        />
      </span>
      <span>
        <label for="message">Message:</label>
        <textarea
          bind:value={mail}
          name="message"
          placeholder="Write your message"
          required
        ></textarea>
      </span>

      <button type="submit" class="btn">{message}<Send /></button>
    </form>
    <p></p>
  </span>
</section>
