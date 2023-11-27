import { render, screen } from "@testing-library/react"
import { InputField } from "@/components/InputField"

it("should have Enter text", () => {
    render(<InputField label="" disabled={false} placeholder="Enter text"/>)
    const myElmt = screen.getByPlaceholderText("Enter text")
    expect(myElmt).toBeInTheDocument()
})