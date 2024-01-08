import NextLink from 'next/link';
import { RemoveScroll } from 'react-remove-scroll';
import { clsx } from 'clsx';
import useActiveLink from '../../hooks/useActiveLink';

export function NavbarLink({
  href,
  as, // this is the NextLink `as` prop, not the `as` polymorphic prop pattern
  children,
  target,
}: {
  href: string;
  as?: string;
  children: React.ReactNode;
  target?: string;
}) {
  const active = useActiveLink({ href, as });
  return (
    <li>
      <NextLink
        href={href}
        className={clsx(
          'px-[16px] py-[5px] text-center font-robotoMono text-base font-normal text-white',
          active ? 'rounded-[50px] bg-white bg-opacity-90 text-neutral-800' : '',
        )}
        target={target}
      >
        {children}
      </NextLink>
    </li>
  );
}

function Navbar({ isMenuOpen = false }: { isMenuOpen?: boolean }) {
  return (
    <>
      <ul className="hidden items-center justify-start gap-8 md:flex">
        <NavbarLink href="/send-card">Send A Card</NavbarLink>
        <NavbarLink href="/your-cards">Your Cards</NavbarLink>
      </ul>
      {isMenuOpen && (
        <div>
          <RemoveScroll allowPinchZoom enabled>
            Ciao
          </RemoveScroll>
        </div>
      )}
    </>
  );
}

export default Navbar;
