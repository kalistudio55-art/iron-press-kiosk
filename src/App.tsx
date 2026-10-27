import { useMemo, useState } from 'react'
import originalImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_37_08-2.png'
import smokedImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_37_49-1.png'
import hotDropImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_38_08-1.png'
import tripleStackImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_38_12.png'
import classicFriesImage from '@/imports/IRON_PRESS_Classic_Fries-1.jpg'
import loadedFriesImage from '@/imports/IRON_PRESS_Loaded_Fries-1.jpg'
import onionRingsImage from '@/imports/IRON_PRESS_Onion_Rings-1.jpg'
import cocaColaImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_55_37-1-2.png'
import cocaColaZeroImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_55_38-2-2.png'
import lemonDrinkImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_55_39-3-2.png'
import waterImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_55_40-4-2.png'
import brownieImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_39_11-2-2.png'
import cheesecakeImage from '@/imports/Imagen_de_ChatGPT_26_oct_2026__08_39_02-2.png'

type Category = 'BURGERS' | 'SIDES' | 'DRINKS' | 'DESSERTS'
type Product = {
  id: string
  category: Category
  name: string
  price: number
  description: string
  image: string
  ingredients?: string[]
}
type CartItem = {
  key: string
  product: Product
  quantity: number
  removed: string[]
  extras: { name: string; price: number }[]
  menu: boolean
  menuDrink?: string
}

const products: Product[] = [
  {
    id: 'original',
    category: 'BURGERS',
    name: 'THE ORIGINAL',
    price: 8.9,
    description: 'Doble smash, cheddar, pepinillos, cebolla y salsa de la casa.',
    ingredients: ['Doble smash', 'Cheddar', 'Pepinillos', 'Cebolla', 'Salsa de la casa'],
    image: originalImage,
  },
  {
    id: 'smoked',
    category: 'BURGERS',
    name: 'SMOKED',
    price: 10.9,
    description: 'Doble smash, cheddar, bacon crujiente, cebolla caramelizada y salsa ahumada.',
    ingredients: ['Doble smash', 'Cheddar', 'Bacon crujiente', 'Cebolla caramelizada', 'Salsa ahumada'],
    image: smokedImage,
  },
  {
    id: 'hot-drop',
    category: 'BURGERS',
    name: 'HOT DROP',
    price: 10.5,
    description: 'Doble smash, cheddar, jalapeños, cebolla morada y mayonesa de chipotle.',
    ingredients: ['Doble smash', 'Cheddar', 'Jalapeños', 'Cebolla morada', 'Mayonesa de chipotle'],
    image: hotDropImage,
  },
  {
    id: 'triple-stack',
    category: 'BURGERS',
    name: 'TRIPLE STACK',
    price: 12.9,
    description: 'Triple smash, triple cheddar, cebolla crujiente, pepinillos y salsa de la casa.',
    ingredients: ['Triple smash', 'Triple cheddar', 'Cebolla crujiente', 'Pepinillos', 'Salsa de la casa'],
    image: tripleStackImage,
  },
  { id: 'classic-fries', category: 'SIDES', name: 'CLASSIC FRIES', price: 2.9, description: 'Patatas finas, doradas y crujientes.', image: classicFriesImage },
  { id: 'loaded-fries', category: 'SIDES', name: 'LOADED FRIES', price: 4.9, description: 'Patatas, cheddar fundido, bacon y salsa de la casa.', image: loadedFriesImage },
  { id: 'onion-rings', category: 'SIDES', name: 'ONION RINGS', price: 3.9, description: 'Aros de cebolla con rebozado crujiente.', image: onionRingsImage },
  { id: 'coke', category: 'DRINKS', name: 'COCA-COLA', price: 2.5, description: 'Refresco de cola.', image: cocaColaImage },
  { id: 'coke-zero', category: 'DRINKS', name: 'COCA-COLA ZERO', price: 2.5, description: 'Refresco de cola sin azúcar.', image: cocaColaZeroImage },
  { id: 'lemon', category: 'DRINKS', name: 'REFRESCO DE LIMÓN', price: 2.5, description: 'Refresco de limón.', image: lemonDrinkImage },
  { id: 'water', category: 'DRINKS', name: 'AGUA MINERAL', price: 1.8, description: 'Agua mineral.', image: waterImage },
  { id: 'brownie', category: 'DESSERTS', name: 'CHOCOLATE BROWNIE', price: 4.5, description: 'Brownie intenso de chocolate.', image: brownieImage },
  { id: 'cheesecake', category: 'DESSERTS', name: 'CHEESECAKE', price: 4.9, description: 'Tarta de queso cremosa.', image: cheesecakeImage },
]

const extras = [
  { name: 'Cheddar adicional', price: 0.8 },
  { name: 'Bacon adicional', price: 1.5 },
  { name: 'Carne smash adicional', price: 2.5 },
  { name: 'Jalapeños adicionales', price: 0.7 },
  { name: 'Cebolla caramelizada adicional', price: 0.8 },
  { name: 'Salsa extra', price: 0.5 },
]

const menuDrinks = ['Coca-Cola', 'Coca-Cola Zero', 'Refresco de limón', 'Agua mineral']

const euro = (value: number) => `${value.toFixed(2).replace('.', ',')} €`

function Logo() {
  return (
    <div className="logo" aria-label="Iron Press Smash Burgers">
      <strong>IRON PRESS</strong>
      <span>SMASH BURGERS</span>
    </div>
  )
}

function Stepper({ value, onChange }: { value: number; onChange: (next: number) => void }) {
  return (
    <div className="stepper">
      <button aria-label="Restar uno" onClick={() => onChange(Math.max(1, value - 1))}>−</button>
      <b>{value}</b>
      <button aria-label="Sumar uno" onClick={() => onChange(value + 1)}>+</button>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<'welcome' | 'menu' | 'detail' | 'cart' | 'order-type' | 'confirmed'>('welcome')
  const [category, setCategory] = useState<Category>('BURGERS')
  const [selected, setSelected] = useState<Product | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [removed, setRemoved] = useState<string[]>([])
  const [chosenExtras, setChosenExtras] = useState<string[]>([])
  const [asMenu, setAsMenu] = useState(false)
  const [menuDrink, setMenuDrink] = useState(menuDrinks[0])
  const [quantity, setQuantity] = useState(1)
  const [orderType, setOrderType] = useState('')
  const [cartPulse, setCartPulse] = useState(false)

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          (item.product.price + item.extras.reduce((extraSum, extra) => extraSum + extra.price, 0) + (item.menu ? 3.9 : 0)) *
            item.quantity,
        0,
      ),
    [cart],
  )
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const detailTotal = selected
    ? (selected.price + extras.filter((extra) => chosenExtras.includes(extra.name)).reduce((sum, extra) => sum + extra.price, 0) + (asMenu ? 3.9 : 0)) * quantity
    : 0

  const openProduct = (product: Product) => {
    if (product.category !== 'BURGERS') {
      setCart((items) => [...items, { key: `${product.id}-${Date.now()}`, product, quantity: 1, removed: [], extras: [], menu: false }])
      pulseCart()
      return
    }
    setSelected(product)
    setRemoved([])
    setChosenExtras([])
    setAsMenu(false)
    setMenuDrink(menuDrinks[0])
    setQuantity(1)
    setScreen('detail')
  }

  const addBurger = () => {
    if (!selected) return
    setCart((items) => [
      ...items,
      {
        key: `${selected.id}-${Date.now()}`,
        product: selected,
        quantity,
        removed,
        extras: extras.filter((extra) => chosenExtras.includes(extra.name)),
        menu: asMenu,
        menuDrink: asMenu ? menuDrink : undefined,
      },
    ])
    pulseCart()
    setScreen('menu')
  }

  const pulseCart = () => {
    setCartPulse(false)
    window.setTimeout(() => setCartPulse(true), 0)
    window.setTimeout(() => setCartPulse(false), 500)
  }

  const updateQuantity = (key: string, next: number) =>
    setCart((items) => items.map((item) => (item.key === key ? { ...item, quantity: next } : item)))

  const clearOrder = () => {
    setCart([])
    setCategory('BURGERS')
    setSelected(null)
    setRemoved([])
    setChosenExtras([])
    setAsMenu(false)
    setMenuDrink(menuDrinks[0])
    setQuantity(1)
    setOrderType('')
  }

  const startOrder = () => {
    clearOrder()
    setScreen('menu')
  }

  const reset = () => {
    clearOrder()
    setScreen('welcome')
  }

  return (
    <main>
      {screen === 'welcome' ? (
        <section className="welcome">
          <Logo />
          <div className="welcome-visual">
            <img src={originalImage} alt="Smashburger IRON PRESS" />
          </div>
          <div className="welcome-copy">
            <h1>¿HAMBRE?</h1>
            <p>Haz tu pedido aquí, a tu gusto.</p>
            <button className="welcome-button" onClick={startOrder}>
              <span>EMPEZAR PEDIDO</span>
              <b aria-hidden="true">→</b>
            </button>
            <small>Toca para comenzar</small>
          </div>
        </section>
      ) : (
        <header className="topbar">
          <Logo />
          {screen !== 'confirmed' && (
            <button className={`cart-button ${cartPulse ? 'pulse' : ''}`} onClick={() => setScreen('cart')}>
              PEDIDO <span>{itemCount}</span>
            </button>
          )}
        </header>
      )}

      {screen === 'menu' && (
        <>
          <nav className="categories" aria-label="Categorías">
            {(['BURGERS', 'SIDES', 'DRINKS', 'DESSERTS'] as Category[]).map((item) => (
              <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>
            ))}
          </nav>
          <section className="product-list category-enter" key={category}>
            {products.filter((product) => product.category === category).map((product) => (
              <button className="product-card" onClick={() => openProduct(product)} key={product.id}>
                <img src={product.image} alt={product.name} />
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <strong>{euro(product.price)}</strong>
                  {category !== 'BURGERS' && <small>AÑADIR +</small>}
                </div>
              </button>
            ))}
          </section>
        </>
      )}

      {screen === 'detail' && selected && (
        <section className="detail">
          <button className="back" onClick={() => setScreen('menu')}>← VOLVER A LA CARTA</button>
          <img className="hero-image" src={selected.image} alt={selected.name} />
          <div className="detail-heading">
            <div><span>SMASHBURGER</span><h1>{selected.name}</h1></div>
            <strong>{euro(selected.price)}</strong>
          </div>
          <p className="lead">{selected.description}</p>
          <OptionSection title="INGREDIENTES INCLUIDOS" subtitle="Desmarca los que quieras quitar">
            {selected.ingredients?.map((ingredient, index) => (
              <label className={`option ${index === 0 ? 'locked' : ''}`} key={ingredient}>
                <span>{ingredient}{index === 0 && <small>Ingrediente principal · no se puede retirar</small>}</span>
                <input type="checkbox" disabled={index === 0} checked={!removed.includes(ingredient)} onChange={() => setRemoved((items) => items.includes(ingredient) ? items.filter((i) => i !== ingredient) : [...items, ingredient])} />
              </label>
            ))}
          </OptionSection>
          <OptionSection title="AÑADE EXTRAS" subtitle="Porciones adicionales con suplemento">
            {extras.filter((extra) => !(selected.id === 'triple-stack' && extra.name === 'Carne smash adicional')).map((extra) => (
              <label className="option" key={extra.name}>
                <span>{extra.name}<small>+ {euro(extra.price)}</small></span>
                <input type="checkbox" checked={chosenExtras.includes(extra.name)} onChange={() => setChosenExtras((items) => items.includes(extra.name) ? items.filter((i) => i !== extra.name) : [...items, extra.name])} />
              </label>
            ))}
          </OptionSection>
          <div className={`menu-upgrade ${asMenu ? 'selected' : ''}`}>
            <button className="menu-toggle" onClick={() => setAsMenu(!asMenu)} aria-pressed={asMenu}>
              <div><b>{asMenu ? 'MENÚ ACTIVADO' : 'CONVIÉRTELO EN MENÚ'}</b><span>Incluye Classic Fries y una bebida básica</span></div>
              <strong>+ 3,90 €</strong>
            </button>
            {asMenu && (
              <fieldset className="drink-picker">
                <legend>ELIGE TU BEBIDA</legend>
                {menuDrinks.map((drink) => (
                  <label key={drink}>
                    <input type="radio" name="menu-drink" value={drink} checked={menuDrink === drink} onChange={() => setMenuDrink(drink)} />
                    <span>{drink}</span>
                  </label>
                ))}
              </fieldset>
            )}
          </div>
          <div className="add-bar">
            <Stepper value={quantity} onChange={setQuantity} />
            <button className="primary" onClick={addBurger}>AÑADIR AL PEDIDO <b>{euro(detailTotal)}</b></button>
          </div>
        </section>
      )}

      {screen === 'cart' && (
        <section className="page">
          <button className="back" onClick={() => setScreen('menu')}>← SEGUIR PIDIENDO</button>
          <div className="eyebrow">TU SELECCIÓN</div>
          <h1>MI PEDIDO</h1>
          {cart.length === 0 ? (
            <div className="empty"><h2>EL PEDIDO ESTÁ VACÍO</h2><p>Vuelve a la carta para añadir tus favoritos.</p></div>
          ) : cart.map((item) => (
            <article className="cart-item" key={item.key}>
              <div>
                <h2>{item.product.name}</h2>
                {item.removed.length > 0 && <p>Sin {item.removed.join(', ')}</p>}
                {item.extras.length > 0 && <p>Extra: {item.extras.map((extra) => extra.name).join(', ')}</p>}
                {item.menu && <p>Menú: Classic Fries + {item.menuDrink}</p>}
              </div>
              <strong>{euro((item.product.price + item.extras.reduce((sum, extra) => sum + extra.price, 0) + (item.menu ? 3.9 : 0)) * item.quantity)}</strong>
              <Stepper value={item.quantity} onChange={(next) => updateQuantity(item.key, next)} />
              <button className="remove" onClick={() => setCart((items) => items.filter((other) => other.key !== item.key))}>ELIMINAR</button>
            </article>
          ))}
          <div className="total-row"><span>TOTAL</span><strong>{euro(cartTotal)}</strong></div>
          <button className="primary wide" disabled={!cart.length} onClick={() => setScreen('order-type')}>CONTINUAR AL PEDIDO →</button>
        </section>
      )}

      {screen === 'order-type' && (
        <section className="page order-type">
          <button className="back" onClick={() => setScreen('cart')}>← VOLVER AL PEDIDO</button>
          <div className="eyebrow">UN ÚLTIMO PASO</div>
          <h1>¿DÓNDE VAS A COMER?</h1>
          <div className="order-options">
            <button onClick={() => setOrderType('COMER AQUÍ')} className={orderType === 'COMER AQUÍ' ? 'selected' : ''}><b>COMER AQUÍ</b><span>Te serviremos en bandeja</span></button>
            <button onClick={() => setOrderType('PARA LLEVAR')} className={orderType === 'PARA LLEVAR' ? 'selected' : ''}><b>PARA LLEVAR</b><span>Preparamos tu pedido para llevar</span></button>
          </div>
          <button className="primary wide" disabled={!orderType} onClick={() => setScreen('confirmed')}>CONFIRMAR PEDIDO →</button>
        </section>
      )}

      {screen === 'confirmed' && (
        <section className="confirmation">
          <div className="stamp">✓</div>
          <div className="eyebrow">PEDIDO CONFIRMADO</div>
          <h1>GRACIAS.<br />YA ESTÁ EN MARCHA.</h1>
          <p>Tu número de pedido es</p>
          <div className="order-number">047</div>
          <div className="summary">
            <div className="summary-details">
              <span>{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</span>
              <span>{orderType.toLowerCase()}</span>
            </div>
            <div className="summary-total"><span>TOTAL</span><strong>{euro(cartTotal)}</strong></div>
          </div>
          <p className="notice">Esto es una simulación conceptual. No se ha realizado ningún cobro ni enviado el pedido a cocina.</p>
          <button className="primary wide" onClick={reset}>INICIAR NUEVO PEDIDO</button>
        </section>
      )}
    </main>
  )
}

function OptionSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <section className="option-section"><div className="section-title"><div><h2>{title}</h2><p>{subtitle}</p></div></div>{children}</section>
}
