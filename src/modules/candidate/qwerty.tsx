import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const page1LoanFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  mobileNumber: z.string().optional(),
});

type Page1LoanFormData = z.infer<typeof page1LoanFormSchema>;

export default function SimpleContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Page1LoanFormData>({
    resolver: zodResolver(page1LoanFormSchema),
  });

  const onSubmit = (data: Page1LoanFormData) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "300px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Contact Info</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Email*</label>
        <input
          type="email"
          {...register("email")}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
          }}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Mobile Number (optional)</label>
        <input
          type="text"
          {...register("mobileNumber")}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            marginTop: "5px",
          }}
        />
        {errors.mobileNumber && (
          <p style={{ color: "red", fontSize: "12px" }}>
            {errors.mobileNumber.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        style={{
          background: "#10b981",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          width: "100%",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
}
