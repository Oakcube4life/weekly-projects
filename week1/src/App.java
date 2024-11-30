import java.util.Scanner;

import java.net.ServerSocket;
import java.net.Socket;

import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.IOException;

public class App {

    private static Scanner consoleInput;
    public static void main(String[] args) {
        consoleInput = new Scanner(System.in);

        System.out.println("Start server or client (s/c): ");
        String inputString = consoleInput.nextLine();

        if (inputString.equals("s")) 
            startServer(50000);
        else if (inputString.equals("c"))
            startClient("", 50000);
        else
            System.out.println("Invalid input!");
    }

    private static void startServer(int port) {
        try {
            //attempt to open socket
            ServerSocket serverSocket = new ServerSocket(port);
            System.out.println("Server started!");

            //socket open wait for client to connect
            Socket socket = serverSocket.accept();

            //this is what reads input from the input stream, different from our actual console input
            Scanner inputStream = new Scanner(new InputStreamReader(socket.getInputStream()));

            //this is our actual output to the output stream, essentiall what we send to the client
            PrintWriter outputStream = new PrintWriter(socket.getOutputStream(), true);

            //start both threads
            beginRecievingThread(socket, inputStream);
            beginSendingThread(socket, outputStream);

        } catch (IOException e) {
            System.out.println(e);
        }
    }

    private static void startClient (String ip, int port) {
        try {
            //attempt to connect to server
            Socket socket = new Socket(ip, port);
            System.out.println("Connected to server!");

            //this is what reads input from the input stream, different from our actual console input
            Scanner inputStream = new Scanner(new InputStreamReader(socket.getInputStream()));

            //this is our actual output to the output stream, essentiall what we send to the client
            PrintWriter outputStream = new PrintWriter(socket.getOutputStream(), true);

            //start both threads
            beginRecievingThread(socket, inputStream);
            beginSendingThread(socket, outputStream);

        } catch (IOException e) {
            System.out.println(e);
        }
    }

    private static void beginRecievingThread(Socket s, Scanner in) {
        Thread incomingMessageThread = new Thread(() -> {
            String incomingMessage;

            //read message when a message \n is found in the inputStream
            while ((incomingMessage = in.nextLine()) != null) {
                System.out.println("Friend: " + incomingMessage);
            }
        });

        incomingMessageThread.start();
    }

    private static void beginSendingThread(Socket s, PrintWriter out) {
        Thread sendingMessageThread = new Thread(() -> {
            String sendingMessage;

            while (true) {
                sendingMessage = consoleInput.nextLine();

                //send message
                out.println(sendingMessage);
            }
        });

        sendingMessageThread.start();
    }
}