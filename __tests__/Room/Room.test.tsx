import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoomPageTempMod, { RoomAddTemp } from './RoomMod'; // Replace with the actual file path

describe('RoomAddTemp component', () => {
  test('Displays the correct text for the Save button', () => {
    render(<RoomAddTemp />);
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
  });

  test('Check placeholder for room condition', () => {
    render(<RoomAddTemp />);
    const descriptionTextarea = screen.getByPlaceholderText('Describe the room condition');
    expect(descriptionTextarea).toBeInTheDocument();
  });

  test('Check text for floor', () => {
    render(<RoomAddTemp />);
    const descriptionTextarea = screen.getByText('Floor');
    expect(descriptionTextarea).toBeInTheDocument();
  });

  test('Check text for room type', () => {
    render(<RoomAddTemp />);
    const descriptionTextarea = screen.getByText('Room Type');
    expect(descriptionTextarea).toBeInTheDocument();
  });

  test('Check text for upload new photo', () => {
    render(<RoomAddTemp />);
    const descriptionTextarea = screen.getByText('Upload New Photo');
    expect(descriptionTextarea).toBeInTheDocument();
  });

  test('Check text for set flag', () => {
    render(<RoomAddTemp />);
    const descriptionTextarea = screen.getByText('Set Flag');
    expect(descriptionTextarea).toBeInTheDocument();
  });

  test('Check text for new room', () => {
    render(<RoomAddTemp />);
    const descriptionTextarea = screen.getByText('New Room');
    expect(descriptionTextarea).toBeInTheDocument();
  });
});
