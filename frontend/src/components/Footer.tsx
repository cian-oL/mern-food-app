const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3l text-white font-bold tracking-tight">
          MernEats.com
        </span>
        <span className="flex text-white font-bold tracking-tight gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};
export default Footer;
