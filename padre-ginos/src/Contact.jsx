import { useMutation } from "@tanstack/react-query";
import { postContact } from "./services/api";

export const Contact = () => {
  const mutation = useMutation({
    mutationKey: ['contact'],
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);

      return postContact({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      });
    }
  })

  if (mutation.isError) {
    return <h3>Something went wrong!</h3>
  }

  return (
    <div className='contact'>
      {
        mutation.isSuccess ? (
          <h3>Submitted!</h3>
        ) : (
          <form action="" onSubmit={mutation.mutate}>
            <input type="text" id="name" name="name" placeholder="Name" />
            <input type="email" id="email" name="email" placeholder="Email"/>
            <textarea id="message" name="message" placeholder="Your message"></textarea>
            <button type="submit">Submit</button>
          </form>
        )
      }
    </div>
  )
}
