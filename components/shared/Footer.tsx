import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className='border-t'>
      {" "}
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href='/' className='w-36'>
          {" "}
          <Image
            src='/assets/images/ford.svg'
            alt='logo'
            width={64}
            height={19}
          ></Image>
        </Link>
        <p> Project for uOttaHack 6</p>
      </div>
    </footer>
  );
};

export default Footer;
