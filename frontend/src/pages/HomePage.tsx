import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col  gap-5 bg-white rounded-lg shadow-md py-8 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a Takeaway Today!
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </section>
      <section className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order your takeaway even faster!
          </span>
          <span>Download our app for faster service and personalistion!</span>
          <img src={appDownloadImage} />
        </div>
      </section>
    </div>
  );
};
export default HomePage;
