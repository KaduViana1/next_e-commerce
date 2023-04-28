import Link from 'next/link';

function Header() {
  return (
    <header>
      <Link href={'/'}>E-Commerce</Link>
      <nav>
        <Link href={'/'}>Home</Link>
        <Link href={'/products'}>Products</Link>
        <input type="search" />
        <Link href={'/account'}>Account</Link>
        <Link href={'/cart'}>Cart</Link>
      </nav>
    </header>
  );
}

export default Header;
