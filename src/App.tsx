import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const showToast = () => {
    toast.success('Success!')
  }

  return (
    <>
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <button
          className="btn btn-primary"
          onClick={showToast}
        >
          Show Toast
        </button>
      </div>

      <ToastContainer position="top-right" />
    </>
  )
}

export default App
