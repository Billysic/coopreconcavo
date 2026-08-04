async function loadProducts(category = 'all') {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Carregando produtos...</p>';

  try {
    const response = await fetch(`/api/products?category=${category}`);
    const products = await response.json();
    
    if (products.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhum produto encontrado nesta categoria.</p>';
      return;
    }

    grid.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.imageUrl}" alt="${p.name}">
        <div class="product-info">
          <div>
            <span class="badge ${p.available ? 'badge-available' : 'badge-seasonal'}">
              ${p.available ? 'Disponível Agora' : 'Sazonal: ' + p.harvestSeason}
            </span>
            <h3 style="margin-top: 0.6rem; color: var(--primary);">${p.name}</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.4rem;">${p.description}</p>
          </div>
          <small style="margin-top: 1.2rem; display:block; color: var(--secondary); font-weight: 700;">
            Cultivado por: ${p.familyOrigin}
          </small>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
    grid.innerHTML = '<p style="grid-column: 1/-1; color: red; text-align: center;">Erro ao carregar o catálogo de produtos.</p>';
  }
}

function filterProducts(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  loadProducts(category);
}

async function submitForm(event) {
  event.preventDefault();
  const feedback = document.getElementById('formFeedback');
  feedback.style.color = "#333";
  feedback.textContent = "Processando envio seguro...";

  const formData = {
    buyerName: document.getElementById('buyerName').value,
    companyName: document.getElementById('companyName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    volume: document.getElementById('volume').value,
    message: document.getElementById('message').value,
    website: document.getElementById('website').value // Honeypot
  };

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (res.ok) {
      feedback.style.color = "green";
      feedback.textContent = data.message;
      document.getElementById('b2bForm').reset();
    } else {
      feedback.style.color = "red";
      feedback.textContent = data.error || "Erro ao processar solicitação.";
    }
  } catch (err) {
    feedback.style.color = "red";
    feedback.textContent = "Erro de conexão com o servidor.";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
});