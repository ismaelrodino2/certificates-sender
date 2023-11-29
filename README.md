# Certificate Sender

## Description

This project serves as a Certificate Sender, allowing users to upload a PDF certificate, customize the recipient's name and date, and subsequently send personalized certificates to a list of email addresses. The application provides flexibility by allowing users to position text fields according to their preferences.

## Features

- **Upload PDF Certificate**: Easily upload the desired PDF certificate that serves as the template for customization.

- **Customize Text Fields**: Personalize each certificate by adding recipient names and dates. The application allows you to position these text fields as per your layout preferences.

- **Bulk Email Sending**: Efficiently send personalized certificates to a list of email addresses.

## Getting Started

Follow these steps to set up and run the Certificate Sender locally:

1. **Clone Repository**: Clone this repository to your local machine using the following command:

    ```bash
    git clone https://github.com/your-username/certificate-sender.git
    ```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies:

    ```bash
    cd certificate-sender
    pnpm i
    ```

3. **Run the Application**: Start the development server to run the application locally:

    ```
    pnpm dev
    ```

4. **Access the Application**: Open your browser and go to `http://localhost:3000` to access the Certificate Sender application.

## Usage

1. **Upload PDF Certificate**:
   - Click on the "Choose File" button to upload the PDF certificate template.

2. **Customize Text Fields**:
   - Use the provided input fields to set the positions for recipient names, dates, and any additional text fields.

3. **Send Certificates**:
   - Enter the list of recipient email addresses.
   - Click on the "Send Certificates" button to send personalized certificates to the specified email addresses.

## Configuration

Adjust the application configuration by modifying the following files:

- **`config.json`**: Customize application settings, such as server configurations and email templates.

## Contributing

If you'd like to contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and commit them.
4. Push to your fork and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

