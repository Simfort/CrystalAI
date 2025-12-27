import AnimtTitle from "./_components/AnimTitle";
import Header from "./_components/Header";
import Textarea from "./_components/Textarea";

export default function Home() {
  return (
    <div className="grid  grid-cols-7">
      <Header />
      <section
        className="col-span-full mt-[200px] flex justify-center items-center"
        aria-labelledby="main-title">
        <div>
          {" "}
          <AnimtTitle />
          <h2
            id="main-title"
            className="text-2xl mb-[10px] text-accent text-center ">
            За вас всё придумает нейросеть
          </h2>
          <Textarea />
        </div>
      </section>
    </div>
  );
}
