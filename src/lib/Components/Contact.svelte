<script>
import Send from "$lib/Icons/send.svelte";
import Gmail from "$lib/Icons/gmail.svelte";
import Whatsapp from "$lib/Icons/whatsapp.svelte";

let subject = $state();
  let mail = $state();
  let active = $state("mail");
  function handleChange(e) {
    mail = e.target.value;
  }

  function submit(e) {
    e.preventDefault();
    console.log(mail);

    const Subject = encodeURIComponent(subject);
    const Mail = encodeURIComponent(mail);
    if (active === "mail") {
      window.location.href = `mailto:osoidaghemarvel@gmail.com?subject=${Subject}&body=${Mail} `;
    } else if (active === "whatsapp") {
      window.location.href = `https://api.whatsapp.com/send?phone=2349045394806&text=${Mail}`;
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
            bind:value={subject}
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

        <button type="submit" class="btn">Send<Send /></button>
      </form>
      <p></p>
    </span>
    <div class="sponsors">
      <span>
        <button
          onclick={() => (active = "mail")}
          style={active === "mail"
            ? "opacity: 2; color: white; border-radius: 20px; font-weight: bold; width: 30vw;"
            : "opacity: 0.5; width: 20vw; border-radius: 20px; "}
          ><Gmail /></button
        >
        <button
          onclick={() => (active = "whatsapp")}
          style={active === "whatsapp"
            ? "opacity: 2; color: white; border-radius: 20px; font-weight: bold; width: 30vw;"
            : "opacity: 0.5; width: 20vw; border-radius: 20px; "}
          ><Whatsapp /></button
        >
      </span>
    </div>
  </section>
