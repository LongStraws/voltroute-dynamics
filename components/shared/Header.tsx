import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "../ui/button";

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex items-center justify-between p-5'>
        <Link href='/' className='w-36'>
          <Image
            src='/assets/images/ford.svg'
            width={64}
            height={19}
            alt='Evently Logo'
          />
        </Link>
        <Link
          href={"/api/auth/login"}
          className={buttonVariants({ variant: "outline" })}
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
