import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated]);

  const onSumbit = handleSubmit(async (values) => {
    signUp(values);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">

        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-center text-2xl font-bold">Register</h1>

        <form onSubmit={onSumbit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}

          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}

          <button type="submit" className="flex my-0 mx-auto bg-zinc-500 rounded-md py-1 px-10">Register</button>
        </form>

        <p className="text-center mt-4 text-sky-500">
          Already have an account? <Link to="/login" className="text-sky-400">LogIn</Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;
