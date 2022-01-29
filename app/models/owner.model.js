module.exports = (mongoose) => {
  const Owner = mongoose.model(
    "owner",
    mongoose.Schema(
      {
        address: String,
        name: { firstName: String, lastName: String },
        dob: Date,
        coordinates: [Number],
      },
      { timestamps: true }
    )
  );

  return Owner;
};
