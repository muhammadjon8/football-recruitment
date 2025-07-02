export default function About() {
  return (
    <div className="relative h-[500px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[200px] bg-white [clip-path:polygon(0_0,100%_0,100%_100%)] z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://www.eisg.com/wp-content/uploads/basket-ball-player-1.jpg')",
        }}
      />
      <div className="relative z-20 text-white p-10">
        <h1 className="text-4xl font-bold">SPORTSREADY</h1>
        <p className="text-lg">Turning positive intent into action.</p>
      </div>
    </div>
  );
}
