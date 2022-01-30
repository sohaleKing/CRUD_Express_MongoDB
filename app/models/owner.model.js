module.exports = (mongoose) => {
  const Owner = mongoose.model(
    "owner",
    mongoose.Schema(
      {
        address: String,
        name: String,
        dob: Date,
        coordinates: [Number, Number],
        age: Number,
      },
      { timestamps: true }
    )
  );

  return Owner;
};
