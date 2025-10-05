const contactBook = {
  contacts: [
    { name: "Alice", phone: "123-456-7890", email: "alice@example.com" },
    { name: "Bob", phone: "987-654-3210", email: "bob@example.com" }
  ],

  findContact: function(name) {
    return this.contacts.filter(contact => contact.name.toLowerCase() === name.toLowerCase());
  },

  addContact: function(name, phone, email) {
    const nameRegex = /^[A-Za-zА-Яа-яёЁ\s'-]+$/;
    const phoneRegex = /^[0-9\s-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name.trim())) return "Invalid name. Only letters allowed.";
    if (!phoneRegex.test(phone.trim())) return "Invalid phone. Only digits, spaces, and dashes allowed.";
    if (!emailRegex.test(email.trim())) return "Invalid email format.";

    this.contacts.push({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    return `Contact "${name.trim()}" added successfully!`;
  },

  showAll: function() {
    if (this.contacts.length === 0) return "No contacts yet.";
    return this.contacts.map(c =>
      Object.entries(c).map(([key, value]) => `${key}: ${value}`).join(", ")
    ).join("<br>");
  }
};

const resultDiv = document.getElementById("result");

document.getElementById("showContacts").addEventListener("click", () => {
  resultDiv.innerHTML = contactBook.showAll();
});

document.getElementById("searchContact").addEventListener("click", () => {
  const name = prompt("Enter name to search:");
  if (!name) return;
  const found = contactBook.findContact(name);
  resultDiv.innerHTML = found.length > 0
    ? found.map(c => Object.entries(c).map(([k,v])=>`${k}: ${v}`).join(", ")).join("<br>")
    : `Contact "${name}" not found.`;
});

document.getElementById("addContact").addEventListener("click", () => {
  const name = prompt("Enter name:");
  const phone = prompt("Enter phone:");
  const email = prompt("Enter email:");
  if (!name || !phone || !email){
    resultDiv.textContent = "All fields are required!";
    return;
  }
  const msg = contactBook.addContact(name, phone, email);
  resultDiv.innerHTML = msg + "<br><br>" + contactBook.showAll();
});
