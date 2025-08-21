import Image from 'next/image';
export default function Home() {
  return (
    <div>
      <h1 className="flex justify-center mt-10 text-3xl underline ">My App en Next.Js en Home</h1>
      <Image src="/robot.jpg" width={500} height={500} className='mt-10 flex justify-center items-center m-auto' alt="imagen de mario bross" />
    </div>


  );
}
