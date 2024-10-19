export const formattedDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
     // For 24-hour time format
    });
  };
  