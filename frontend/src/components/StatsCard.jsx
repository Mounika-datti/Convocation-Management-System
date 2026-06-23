function StatsCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className={`${color} rounded-2xl p-6 text-white shadow-xl`}
    >
      <h2 className="text-3xl font-bold">
        {value}
      </h2>

      <p className="mt-2 text-lg">
        {title}
      </p>
    </div>
  );
}

export default StatsCard;